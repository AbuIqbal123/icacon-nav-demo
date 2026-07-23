/**
 * Participant hall / screen assignments.
 * Replace PARTICIPANTS with the official list when available —
 * UI only needs { id, name, hall, screen }.
 */

export interface Participant {
  id: string
  name: string
  /** e.g. "Hall A" */
  hall: string
  /** e.g. "3" or "Screen 3" */
  screen: string
}

/** Placeholder rows — swap for official assignments. Sorted A–Z by name. */
export const PARTICIPANTS: Participant[] = [
  { id: 'p01', name: 'Dr. Aisha Rahman', hall: 'Hall A', screen: '1' },
  { id: 'p02', name: 'Dr. Farhan Ali', hall: 'Hall B', screen: '2' },
  { id: 'p03', name: 'Dr. Imran Siddiqui', hall: 'Hall A', screen: '3' },
  { id: 'p04', name: 'Dr. Kavita Mehta', hall: 'Hall C', screen: '1' },
  { id: 'p05', name: 'Dr. Neha Verma', hall: 'Hall B', screen: '4' },
  { id: 'p06', name: 'Dr. Omar Khan', hall: 'Hall A', screen: '2' },
  { id: 'p07', name: 'Dr. Priya Sharma', hall: 'Hall C', screen: '3' },
  { id: 'p08', name: 'Dr. Rohan Gupta', hall: 'Hall B', screen: '1' },
  { id: 'p09', name: 'Dr. Sana Fatima', hall: 'Hall A', screen: '4' },
  { id: 'p10', name: 'Dr. Vikram Joshi', hall: 'Hall C', screen: '2' },
]
