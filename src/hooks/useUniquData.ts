import { useState, } from 'react';

export function UniqueItemList() {

    const uniqueItem = (items:any,filterVal:any='id') => {
        const uniqueIds = new Set();
        const uniquePeople = items.filter((item:any) => {
          if (uniqueIds.has(item[filterVal])) {
            return false; // Skip duplicates
          } else {
            uniqueIds.add(item.id); // Add unique 'id' to the set
            return true; // Keep unique item
          }
        });
        return uniquePeople;
    }
    return {
        uniqueItem
    };
}
