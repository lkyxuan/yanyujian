import data from '../../content/hotel-story.json'

export const storyData = {
  hotel: {
    zh: data.hotelDescription.zh,
    en: data.hotelDescription.en,
    ko: data.hotelDescription.ko,
  },
  sandPainting: {
    zh: data.sandPaintingDescription.zh,
    en: data.sandPaintingDescription.en,
    ko: data.sandPaintingDescription.ko,
  },
  images: data.images,
}
