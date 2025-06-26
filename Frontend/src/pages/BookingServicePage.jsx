import React, { useEffect, useState } from 'react'

import { ServiceService } from '@/services/serviceService'
import BookingForm from '@/components/BookingForm';

function BookingServicePage() {
  const [service, setService] = useState(null);

  useEffect(() => {
    const serviceId = window.location.pathname.split('/').pop();
    const fetchService = async () => {
      const response = await ServiceService.getServiceById(serviceId);
      setService(response);
    };

    fetchService();
  }, []);

  return (
    <div>
      {service ? (
        <BookingForm service={service} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default BookingServicePage
