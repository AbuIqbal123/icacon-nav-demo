import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ChevronRight, FileText, Globe, MapPin } from 'lucide-react-native'
import { EVENT_DAYS, LINKS, WORKSHOP_DAY, WORKSHOPS } from '@/src/data/events'
import type { EventDayId } from '@/src/data/types'
import { colors } from '@/src/theme/colors'
import { openExternal } from '@/src/lib/linking'

const TAB_LABEL: Record<EventDayId, string> = {
  workshop: '11 Sept',
  day1: '12 Sept',
  day2: '13 Sept',
}

function VenueRow({ name, mapsUrl }: { name: string; mapsUrl: string }) {
  return (
    <Pressable
      onPress={() => openExternal(mapsUrl)}
      style={({ pressed }) => [styles.venueRow, pressed && styles.venueRowPressed]}
    >
      <View style={styles.venueIcon}>
        <MapPin size={18} color={colors.brand} />
      </View>
      <View style={styles.venueCopy}>
        <Text style={styles.venueName}>{name}</Text>
        <Text style={styles.venueAction}>Open in Google Maps</Text>
      </View>
      <ChevronRight size={18} color={colors.inkMuted} />
    </Pressable>
  )
}

function Resources() {
  return (
    <View style={styles.resources}>
      <Text style={styles.resourcesLabel}>More details</Text>
      <View style={styles.resourcesCard}>
        <Pressable
          onPress={() => router.push('/pdf/brochure')}
          style={({ pressed }) => [styles.resourceRow, pressed && styles.resourcePressed]}
        >
          <View style={styles.resourceIcon}>
            <FileText size={18} color={colors.brand} />
          </View>
          <View style={styles.resourceCopy}>
            <Text style={styles.resourceTitle}>Brochure</Text>
            <Text style={styles.resourceSub}>Full event overview</Text>
          </View>
          <ChevronRight size={18} color={colors.inkMuted} />
        </Pressable>

        <View style={styles.resourceDivider} />

        <Pressable
          onPress={() => openExternal(LINKS.website)}
          style={({ pressed }) => [styles.resourceRow, pressed && styles.resourcePressed]}
        >
          <View style={styles.resourceIcon}>
            <Globe size={18} color={colors.brand} />
          </View>
          <View style={styles.resourceCopy}>
            <Text style={styles.resourceTitle}>Website</Text>
            <Text style={styles.resourceSub}>icaconaligarh.com</Text>
          </View>
          <ChevronRight size={18} color={colors.inkMuted} />
        </Pressable>
      </View>
    </View>
  )
}

export default function ProgrammeScreen() {
  const [dayId, setDayId] = useState<EventDayId>('workshop')
  const day = EVENT_DAYS.find((d) => d.id === dayId) ?? EVENT_DAYS[0]
  const isConference = dayId === 'day1' || dayId === 'day2'

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Programme</Text>

        <View style={styles.segment}>
          {EVENT_DAYS.map((d) => {
            const active = d.id === dayId
            return (
              <Pressable
                key={d.id}
                onPress={() => setDayId(d.id)}
                style={[styles.segmentItem, active && styles.segmentItemActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                  {TAB_LABEL[d.id]}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {isConference ? (
          <>
            <View style={styles.pdfBlock}>
              <Text style={styles.pdfTitle}>
                {dayId === 'day1' ? 'Day 1' : 'Day 2'} programme
              </Text>
              <Text style={styles.pdfBody}>
                Full scientific schedule with sessions and speakers.
              </Text>
              <Pressable
                style={({ pressed }) => [styles.pdfBtn, pressed && { opacity: 0.9 }]}
                onPress={() =>
                  router.push(dayId === 'day1' ? '/pdf/day1' : '/pdf/day2')
                }
              >
                <Text style={styles.pdfBtnText}>View programme</Text>
              </Pressable>
            </View>

            <Text style={styles.blockLabel}>Venue</Text>
            <View style={styles.venueCard}>
              <VenueRow name={day.venue} mapsUrl={day.mapsUrl} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.context}>
              <Text style={styles.contextTitle}>Pre-conference workshops</Text>
            </View>

            <View style={styles.timeBanner}>
              <Text style={styles.timeBannerTime}>{WORKSHOP_DAY.timeLabel}</Text>
              <Text style={styles.timeBannerNote}>{WORKSHOP_DAY.timeNote}</Text>
            </View>

            <View style={styles.list}>
              {WORKSHOPS.map((w, index) => (
                <View
                  key={w.id}
                  style={[styles.row, index < WORKSHOPS.length - 1 && styles.rowBorder]}
                >
                  <Text style={styles.workshopTitle}>{w.title}</Text>
                  {w.director ? (
                    <Text style={styles.director}>{w.director}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            <Text style={styles.footnote}>
              Seats: first come, first served. Conference registration required.
              Fee {WORKSHOP_DAY.fee} each (incl. 18% GST).
            </Text>

            <Text style={styles.blockLabel}>Venue</Text>
            <View style={styles.venueCard}>
              <VenueRow name={day.venue} mapsUrl={day.mapsUrl} />
            </View>

            <Resources />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  segment: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: colors.border,
    borderRadius: 12,
    padding: 3,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: colors.surfaceElevated,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.inkMuted,
  },
  segmentTextActive: {
    color: colors.ink,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  context: {
    marginBottom: 12,
  },
  contextTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ink,
  },
  timeBanner: {
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
  },
  timeBannerTime: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.brand,
  },
  timeBannerNote: {
    marginTop: 3,
    fontSize: 13,
    color: colors.inkMuted,
    fontWeight: '500',
  },
  list: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  workshopTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.ink,
    lineHeight: 22,
  },
  director: {
    marginTop: 5,
    fontSize: 14,
    color: colors.inkMuted,
    lineHeight: 19,
  },
  footnote: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 18,
    color: colors.inkMuted,
    paddingHorizontal: 4,
  },
  blockLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  venueCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  venueRowPressed: {
    backgroundColor: colors.surface,
  },
  venueIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(134, 52, 25, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueCopy: {
    flex: 1,
    minWidth: 0,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  venueAction: {
    marginTop: 2,
    fontSize: 13,
    color: colors.brand,
    fontWeight: '500',
  },
  resources: {
    marginTop: 28,
  },
  resourcesLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  resourcesCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  resourcePressed: {
    backgroundColor: colors.surface,
  },
  resourceIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceCopy: {
    flex: 1,
    minWidth: 0,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.ink,
  },
  resourceSub: {
    marginTop: 2,
    fontSize: 13,
    color: colors.inkMuted,
  },
  resourceDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 62,
  },
  pdfBlock: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  pdfTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
  },
  pdfBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  pdfBtn: {
    marginTop: 18,
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  pdfBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
})
