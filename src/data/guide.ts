import guideContent from '../../content/guide.json'
import hotelInfo from '../../content/hotel-info.json'

export const guideData = {
  transport: guideContent.transport,
  attractions: guideContent.attractions.map((a) => ({
    ...a,
    tips: { zh: a.tipZh, en: a.tipEn },
  })),
  food: guideContent.food,
  tips: guideContent.tips,
  taxiDestinations: hotelInfo.taxiDestinations,
  emergency: hotelInfo.emergencyContacts,
}
