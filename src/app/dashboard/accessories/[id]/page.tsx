import React from 'react';

import IAccessory from '@/interfaces/accessory';
import { getAccessory } from '@/libs/accessories';
import PageHeading from '@/components/Shared/PageHeading';
import AccessoryDetails from '@/components/Dashboard/AccessoriesListings/AccesoryDetails';

export default async function AccessoryListing({ params }: { params: { id: string } }) {

  const apiRes: Promise<IAccessory | null> = getAccessory(params.id);
  const pet = await apiRes;

  return (
    <section>
      <PageHeading type="Accessory"/>

      <AccessoryDetails accessoryDetails={pet}/>
    </section>
  );
}
