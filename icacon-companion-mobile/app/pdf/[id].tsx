import { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { WebView } from 'react-native-webview'
import type { PdfId } from '@/src/data/types'
import { PDF_ASSETS } from '@/src/data/events'
import { openBundledPdf, resolvePdfUri } from '@/src/lib/pdfs'
import { colors } from '@/src/theme/colors'
import { PrimaryButton } from '@/src/components/Ui'

const VALID: PdfId[] = ['brochure', 'day1', 'day2']

/**
 * iOS WebView can preview local PDFs. Android WebView often cannot —
 * we open with ACTION_VIEW (system PDF apps) and keep this screen as fallback UI.
 */
export default function PdfScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const pdfId = (VALID.includes(id as PdfId) ? id : 'brochure') as PdfId
  const meta = PDF_ASSETS[pdfId]
  const [uri, setUri] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const preferSystemViewer = Platform.OS === 'android'

  useEffect(() => {
    let alive = true
    ;(async () => {
      const resolved = await resolvePdfUri(pdfId)
      if (!alive) return
      if (!resolved) {
        setError(true)
        return
      }
      setUri(resolved)
      // Android: open system PDF viewer immediately; keep screen as fallback UI
      if (preferSystemViewer) {
        await openBundledPdf(pdfId)
      }
    })()
    return () => {
      alive = false
    }
  }, [pdfId, preferSystemViewer])

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ title: meta.title }} />
      {error ? (
        <View style={styles.center}>
          <Text style={styles.msg}>Could not load this PDF.</Text>
          <PrimaryButton label="Try again" onPress={() => openBundledPdf(pdfId)} />
        </View>
      ) : !uri ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.brand} />
        </View>
      ) : preferSystemViewer ? (
        <View style={styles.center}>
          <Text style={styles.msg}>{meta.title}</Text>
          <Text style={styles.hint}>Opens in your device PDF viewer.</Text>
          <PrimaryButton label="Open PDF" onPress={() => openBundledPdf(pdfId)} />
        </View>
      ) : (
        <>
          <WebView
            source={{ uri }}
            style={styles.web}
            originWhitelist={['*']}
            allowFileAccess
            onError={() => setError(true)}
            // Avoid overly broad file access when not required
            mixedContentMode="never"
          />
          <View style={styles.footer}>
            <PrimaryButton
              label="Share"
              variant="outline"
              onPress={() => openBundledPdf(pdfId)}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  web: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  msg: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hint: {
    color: colors.inkMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
})
