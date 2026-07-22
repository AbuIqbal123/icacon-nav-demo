import { Alert, Platform } from 'react-native'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system/legacy'
import * as Sharing from 'expo-sharing'
import type { PdfId } from '../data/types'
import { PDF_ASSETS } from '../data/events'

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

/** Open bundled PDF with the system share sheet / viewer (works offline). */
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
    const canShare = await Sharing.isAvailableAsync()
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: meta.title,
        UTI: 'com.adobe.pdf',
      })
      return
    }

    Alert.alert(
      meta.title,
      Platform.OS === 'ios'
        ? 'Unable to open this PDF on this device.'
        : 'Install a PDF viewer app, then try again.',
    )
  } catch {
    Alert.alert('Could not open PDF', 'Please try again.')
  }
}
