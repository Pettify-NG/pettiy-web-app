import React from 'react';

import IAccessory from '@/interfaces/accessory';
import { getAccessory } from '@/libs/accessories';
import PageHeading from '@/components/Shared/PageHeading';
import EditAccessoryForm from '@/components/Dashboard/AccessoriesListings/EditAccessoryForm';

export default async function EditAccessory({ params }: { params: { id: string } }) {

  const response: IAccessory | undefined = await getAccessory(params.id);

  return (
    <section>
      <PageHeading type="Accessory"/>
      <EditAccessoryForm accessory={response} />
    </section>
  );
}
