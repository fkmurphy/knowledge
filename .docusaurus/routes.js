import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '3bc'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '8c1'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/argentina/historico/viedma/inundacion-1899/',
        component: ComponentCreator('/argentina/historico/viedma/inundacion-1899/', 'e3f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/argentina/historico/viedma/inundacion-1899/planos-inundacion-1899',
        component: ComponentCreator('/argentina/historico/viedma/inundacion-1899/planos-inundacion-1899', '6e6'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/argentina/rio-negro/deuda-castello',
        component: ComponentCreator('/argentina/rio-negro/deuda-castello', 'bcf'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/daily/2023/Aug',
        component: ComponentCreator('/daily/2023/Aug', 'b48'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/daily/2023/Sep',
        component: ComponentCreator('/daily/2023/Sep', '401'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/artificial-intelligence/',
        component: ComponentCreator('/tech/artificial-intelligence/', '692'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/artificial-intelligence/confusion-matrix',
        component: ComponentCreator('/tech/artificial-intelligence/confusion-matrix', 'fa7'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/artificial-intelligence/rasa/',
        component: ComponentCreator('/tech/artificial-intelligence/rasa/', 'a63'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/artificial-intelligence/tools',
        component: ComponentCreator('/tech/artificial-intelligence/tools', 'a58'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/blockchain/ethereum/',
        component: ComponentCreator('/tech/blockchain/ethereum/', '276'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/blockchain/ethereum/standard/erc-721',
        component: ComponentCreator('/tech/blockchain/ethereum/standard/erc-721', '9f1'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/blockchain/tools/foundry/',
        component: ComponentCreator('/tech/blockchain/tools/foundry/', '690'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/blockchain/tools/tenderly/',
        component: ComponentCreator('/tech/blockchain/tools/tenderly/', 'db5'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/blockchain/tools/tenderly/verificar-smart-contract',
        component: ComponentCreator('/tech/blockchain/tools/tenderly/verificar-smart-contract', '914'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/data-science/',
        component: ComponentCreator('/tech/data-science/', '0b8'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/data-science/dbt',
        component: ComponentCreator('/tech/data-science/dbt', 'ddb'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/git/signing-commits',
        component: ComponentCreator('/tech/git/signing-commits', 'fd8'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/iot/esp32',
        component: ComponentCreator('/tech/iot/esp32', 'ffd'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/tech/rust/',
        component: ComponentCreator('/tech/rust/', '12b'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/templates/daily-notes',
        component: ComponentCreator('/templates/daily-notes', 'bdf'),
        exact: true,
        sidebar: "sidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
