import axios from "axios";

const API_KEY = Bun.env.GOOGLE_PLACES_API_KEY;

async function getPlaceId(locationName: string): Promise<string | null> {
  const url =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
  const params = {
    input: locationName,
    inputtype: "textquery",
    fields: "place_id",
    key: API_KEY,
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching place ID:", error);
    return null;
  }
}

async function getPlacePhotos(placeId: string): Promise<any[] | null> {
  const url = "https://maps.googleapis.com/maps/api/place/details/json";
  const params = {
    place_id: placeId,
    fields: "photos",
    key: API_KEY,
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;
    if (data.result && data.result.photos) {
      return data.result.photos;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching place photos:", error);
    return null;
  }
}

function getPhotoUrl(photoReference: string, maxWidth: number = 1200): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${API_KEY}`;
}

async function fetchPlacePhotos(locationName: string): Promise<any> {
  const placeId = await getPlaceId(locationName);
  if (placeId) {
    const photos = await getPlacePhotos(placeId);
    if (photos) {
      const photoUrls = photos.map((photo: any) =>
        getPhotoUrl(photo.photo_reference)
      );
      return photoUrls;
    }
  }
  return null;
}

export { fetchPlacePhotos };
