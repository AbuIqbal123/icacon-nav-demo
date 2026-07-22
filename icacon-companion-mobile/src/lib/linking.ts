import { Alert, Linking, Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import NetInfo from '@react-native-community/netinfo'
import { VENUE_MAPS } from '../data/events'

/**
 * Open tel: / mailto:.
 * Always attempt openURL — do not gate on canOpenURL (often false on iOS).
 * Ignore rejections (user cancelled the system sheet).
 */
export async function openTel(phone: string): Promise<void> {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.length < 5) return
  try {
    await Linking.openURL(`tel:${digits}`)
  } catch {
    // cancelled or unavailable — no alert noise
  }
}

export async function openMail(email: string): Promise<void> {
  const trimmed = email.trim()
  if (!trimmed.includes('@')) return
  try {
    await Linking.openURL(`mailto:${trimmed}`)
  } catch {
    // cancelled or unavailable
  }
}

async function ensureOnline(): Promise<boolean> {
  const net = await NetInfo.fetch()
  if (net.isConnected === false) {
    Alert.alert(
      'No internet connection',
      'This link needs a network connection. Try again when you are online.',
    )
    return false
  }
  return true
}

/** External https (and maps) — needs network. */
export async function openExternal(url: string): Promise<void> {
  if (url.startsWith('mailto:')) {
    await openMail(url.replace(/^mailto:/i, ''))
    return
  }
  if (url.startsWith('tel:')) {
    await openTel(url.replace(/^tel:/i, ''))
    return
  }

  if (!(await ensureOnline())) return

  const isMaps =
    url.includes('google.com/maps') ||
    url.includes('maps.apple.com') ||
    url.startsWith('geo:') ||
    url.startsWith('maps:')

  try {
    if (isMaps) {
      await Linking.openURL(url)
      return
    }

    await WebBrowser.openBrowserAsync(url, {
      presentationStyle:
        Platform.OS === 'ios'
          ? WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET
          : WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    })
  } catch {
    try {
      await Linking.openURL(url)
    } catch {
      Alert.alert(
        'Unable to open link',
        'Please try again when you have a connection.',
      )
    }
  }
}

/** Pick JNMC or Lemon Tree → Google Maps. */
export function openVenuePicker(): void {
  Alert.alert('Open venue in Maps', undefined, [
    {
      text: 'JNMC (workshops · 11 Sept)',
      onPress: () => {
        void openExternal(VENUE_MAPS.jnmc)
      },
    },
    {
      text: 'Lemon Tree (conference · 12–13 Sept)',
      onPress: () => {
        void openExternal(VENUE_MAPS.lemonTree)
      },
    },
    { text: 'Cancel', style: 'cancel' },
  ])
}
