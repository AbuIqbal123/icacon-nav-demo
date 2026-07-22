import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronRight, Compass, MapPin } from 'lucide-react-native'
import { EVENT_META, VENUE_MAPS } from '@/src/data/events'
import { colors } from '@/src/theme/colors'
import { openExternal } from '@/src/lib/linking'

export default function NavigateScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Navigate</Text>
        <Text style={styles.sub}>Venues & indoor map</Text>

        <View style={styles.heroCard}>
          <View style={styles.iconWrap}>
            <Compass size={28} color={colors.brand} />
          </View>
          <Text style={styles.title}>Indoor map</Text>
          <Text style={styles.heroBody}>
            Floor-by-floor guidance for JNMC workshop rooms will unlock when
            floor plans are finalised.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Open in Maps</Text>
        <View style={styles.card}>
          <Pressable
            onPress={() => openExternal(VENUE_MAPS.jnmc)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.rowIcon}>
              <MapPin size={18} color={colors.brand} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>JNMC, AMU Aligarh</Text>
              <Text style={styles.rowSub}>Workshops · {EVENT_META.workshopDateShort}</Text>
            </View>
            <ChevronRight size={18} color={colors.inkMuted} />
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            onPress={() => openExternal(VENUE_MAPS.lemonTree)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <View style={styles.rowIcon}>
              <MapPin size={18} color={colors.brand} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>{EVENT_META.conferenceVenue}</Text>
              <Text style={styles.rowSub}>Conference · {EVENT_META.conferenceDates}</Text>
            </View>
            <ChevronRight size={18} color={colors.inkMuted} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  sub: { fontSize: 14, color: colors.inkMuted, marginTop: 4, marginBottom: 18 },
  heroCard: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(134, 52, 25, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.ink },
  heroBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
    textAlign: 'center',
  },
  sectionLabel: {
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  rowPressed: { backgroundColor: colors.surface },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCopy: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: colors.ink },
  rowSub: { marginTop: 2, fontSize: 13, color: colors.inkMuted },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 62,
  },
})
