import React from 'react';
import { GoodsList, GoodsItem } from '@/components';
import { delay } from '@/utils';

export default function GoodsListDemo() {
  const fetchGoods = async ({
    activeCategory,
    page,
    limit
  }: {
    activeCategory: string;
    page: number;
    limit: number;
  }) => {
    await delay(1000);

    return new Array(10).fill(1).map((_, index) => {
      const id = (page - 1) * limit + index;

      return {
        id,
        name: activeCategory + id,
        spec: '测试'
      };
    });
  };

  const fetchCategories = async () => {
    return [
      {
        key: '1',
        label: '1',
        children: [
          {
            key: '11',
            label: '11'
          },
          {
            key: '12',
            label: '12'
          }
        ]
      },
      {
        key: '2',
        label: '2',
        children: [
          {
            key: '21',
            label: '21'
          }
        ]
      }
    ];
  };

  return (
    <GoodsList
      keyExtractor={item => item.id.toString()}
      fetchGoods={fetchGoods}
      fetchCategories={fetchCategories}
      limit={10}
      renderItem={({ item }) => <GoodsItem name={item.name} spec={item.spec} />}
    />
  );
}
