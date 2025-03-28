import React from 'react';

import { IPet } from '@/interfaces/pet';
import { getPet } from '@/libs/pets';
import PageHeading from '@/components/Shared/PageHeading';
import PetDetails from '@/components/Dashboard/PetListings/PetDetails';

export default async function PetListing({ params }: { params: { id: string } }) {

  const apiRes: Promise<IPet | null> = getPet(params.id);
  const pet = await apiRes;

  return (
    <section>
      <PageHeading type="Pet"/>

      <PetDetails petDetails={pet}/>
    </section>
  );
}
