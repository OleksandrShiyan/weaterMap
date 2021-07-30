const _eQuatorialEarthRadius = 6378.137;
const _d2r = Math.PI / 180.0;

function HaversineInM(lat1: number, long1: number, lat2: number, long2: number) {
  return 1000.0 * HaversineInKM(lat1, long1, lat2, long2);
}

export function HaversineInKM(lat1: number, long1: number, lat2: number, long2: number) {
  const dlong = (long2 - long1) * _d2r;
  const dlat = (lat2 - lat1) * _d2r;
  const a =
    Math.pow(Math.sin(dlat / 2.0), 2.0) +
    Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
  const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));

  return _eQuatorialEarthRadius * c;
}