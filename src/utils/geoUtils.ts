// utils/geoUtils.ts - Shared geolocation utilities

export interface LatLng {
  latitude: number;
  longitude: number;
}

/**
 * Calculate distance between two coordinates using the Haversine formula.
 * @returns Distance in meters.
 */
export const haversineDistance = (coord1: LatLng, coord2: LatLng): number => {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Calculate the latitude/longitude delta for a given radius (in miles)
 * to properly size a map region.
 */
export const radiusToLatLngDelta = (radiusMiles: number): { latitudeDelta: number; longitudeDelta: number } => {
  // 1 degree of latitude is approximately 69 miles
  const latDelta = (radiusMiles / 69) * 2.5; // 2.5x padding so the circle fits comfortably
  return {
    latitudeDelta: latDelta,
    longitudeDelta: latDelta,
  };
};
