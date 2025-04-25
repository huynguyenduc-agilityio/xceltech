import { Carousel } from '@/components';

// Constants
import { DASHBOARD_TILE_ITEMS } from '@/__mocks__';

const InfoTileList = () => {
  return <Carousel className="mt-8" listContent={DASHBOARD_TILE_ITEMS} />;
};

export default InfoTileList;
