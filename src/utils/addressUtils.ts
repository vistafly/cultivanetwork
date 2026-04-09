// utils/addressUtils.ts
interface PlaceDetails {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  name: string;
}

export interface FormattedAddress {
  fullAddress: string;
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  country: string;
  countryCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  placeId: string;
  businessName?: string;
}

export const formatPlaceToAddress = (place: PlaceDetails): FormattedAddress => {
  const addressComponents = place.address_components || [];

  const getComponent = (types: string[]) => {
    return addressComponents.find(component =>
      component.types.some(type => types.includes(type))
    );
  };

  const streetNumber = getComponent(['street_number'])?.long_name || '';
  const route = getComponent(['route'])?.long_name || '';
  const city = getComponent(['locality', 'administrative_area_level_2'])?.long_name || '';
  const state = getComponent(['administrative_area_level_1'])?.long_name || '';
  const stateCode = getComponent(['administrative_area_level_1'])?.short_name || '';
  const zipCode = getComponent(['postal_code'])?.long_name || '';
  const country = getComponent(['country'])?.long_name || '';
  const countryCode = getComponent(['country'])?.short_name || '';

  const streetName = route;

  return {
    fullAddress: place.formatted_address,
    streetNumber,
    streetName,
    city,
    state,
    stateCode,
    zipCode,
    country,
    countryCode,
    coordinates: {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    },
    placeId: place.place_id,
    businessName: place.name,
  };
};

export const formatAddressForFirebase = (address: FormattedAddress) => {
  return {
    address: address.fullAddress,
    coordinates: address.coordinates,
    placeId: address.placeId,
    addressComponents: {
      streetNumber: address.streetNumber,
      streetName: address.streetName,
      city: address.city,
      state: address.state,
      stateCode: address.stateCode,
      zipCode: address.zipCode,
      country: address.country,
      countryCode: address.countryCode,
    },
  };
};

export default {
  formatPlaceToAddress,
  formatAddressForFirebase,
};
