import { CardSkeleton } from '@/components/skelton/CardSkeleton';
import React from 'react';

const loading = () => {
    return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        
          
        
    
    </div>
    );
};

export default loading;