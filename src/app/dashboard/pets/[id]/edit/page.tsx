import React from 'react';

import { IPet } from '@/interfaces/pet';
import { getPet } from '@/libs/pets';
import PageHeading from '@/components/Shared/PageHeading';
import EditPetForm from '@/components/Dashboard/PetListings/EditPet';

export default async function EditPet({ params }: { params: { id: string } }) {

  const response: IPet | undefined = await getPet(params.id);

  return (
    <section>
      <PageHeading type="Pet"/>
      <EditPetForm pet={response} />
    </section>
  );
}
