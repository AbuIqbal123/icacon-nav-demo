import { Alert, Platform } from 'react-native'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system/legacy'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Sharing from 'expo-sharing'
import type { PdfId } from '../data/types'
import { PDF_ASSETS } from '../data/events'

/** Intent.FLAG_GRANT_READ_URI_PERMISSION — required so external viewers can read the content URI. */
const FLAG_GRANT_READ_URI_PERMISSION = 1

export async function resolvePdfUri(id: PdfId): Promise<string | null> {
  try {
    const asset = Asset.fromModule(PDF_ASSETS[id].module)
    await asset.downloadAsync()
    const uri = asset.localUri ?? asset.uri
    if (!uri) return null

    // Stable file:// path with .pdf extension (Android viewers + WebView)
    if (uri.startsWith('file://') && uri.toLowerCase().endsWith('.pdf')) {
      return uri
    }

    const base = FileSystem.cacheDirectory
    if (!base) return uri

    const dest = `${base}icacon-${id}.pdf`
    const info = await FileSystem.getInfoAsync(dest)
    if (!info.exists) {
      await FileSystem.copyAsync({ from: uri, to: dest })
    }
    return dest
  } catch {
    return null
  }
}

/** Share sheet (iOS open/share, Android fallback when no viewer handles VIEW). */
async function sharePdf(uri: string, title: string): Promise<boolean> {
  const canShare = await Sharing.isAvailableAsync()
  if (!canShare) return false
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: title,
    UTI: 'com.adobe.pdf',
  })
  return true
}

/**
 * Android: open with the system PDF viewer via ACTION_VIEW + content:// URI.
 * Falls back to the share sheet if no app can handle the intent.
 */
async function openWithAndroidViewer(uri: string): Promise<void> {
  const contentUri = await FileSystem.getContentUriAsync(uri)
  await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    data: contentUri,
    type: 'application/pdf',
    flags: FLAG_GRANT_READ_URI_PERMISSION,
  })
}

/** Open bundled PDF offline: Android VIEW intent; iOS / fallback share sheet. */
export async function openBundledPdf(id: PdfId): Promise<void> {
  const meta = PDF_ASSETS[id]
  const uri = await resolvePdfUri(id)
  if (!uri) {
    Alert.alert(
      'PDF not available',
      'The file could not be loaded. Reinstall the app or contact the organiser.',
    )
    return
  }

  try {
    if (Platform.OS === 'android') {
      try {
        await openWithAndroidViewer(uri)
        return
      } catch {
        // No PDF handler or intent failed — try share sheet as last resort
        const shared = await sharePdf(uri, meta.title)
        if (shared) return
        Alert.alert(
          meta.title,
          'Install a PDF viewer app, then try again.',
        )
        return
      }
    }

    // iOS: share sheet lets the user open/save via system UI
    const shared = await sharePdf(uri, meta.title)
    if (!shared) {
      Alert.alert(meta.title, 'Unable to open this PDF on this device.')
    }
  } catch {
    Alert.alert('Could not open PDF', 'Please try again.')
  }
}
