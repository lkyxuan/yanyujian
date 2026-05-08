import guideContent from '../../content/guide.json'
import hotelInfo from '../../content/hotel-info.json'

export const guideData = {
  transport: guideContent.transport,
  destinations: (guideContent as any).destinations,
  attractions: guideContent.attractions.map((a) => ({
    ...a,
    tips: { zh: a.tipZh, en: a.tipEn, ko: a.tipKo, ja: (a as any).tipJa },
  })),
  food: guideContent.food,
  tips: guideContent.tips,
  taxiDestinations: hotelInfo.taxiDestinations,
  emergency: hotelInfo.emergencyContacts,
}
