// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Blockchain',
      items: [
        {
          type: 'category',
          label: 'Ethereum',
          link: {type: 'doc', id: 'blockchain/ethereum/ethereum'},
          items: [
              {
                label: 'ERC',
                type: 'category',
                items: [
                  {
                    type: 'autogenerated',
                    dirName: 'blockchain/ethereum/standard'
                  }
                ]
              }
          ]
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            {
              type: 'autogenerated',
              dirName: 'blockchain/tools'
            }
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Inteligencia artificial',
      items: [
        {
          type: 'autogenerated',
          dirName: 'artificial-intelligence'
        }
      ],
    },
    {
      type: 'category',
      label: 'Data science',
      items: [
        {
          type: 'autogenerated',
          dirName: 'data-science'
        }
      ],
    },
    {
      type: 'category',
      label: 'IoT',
      items: [
        {
          type: 'autogenerated',
          dirName: 'iot'
        }
      ],
    },
    {
      type: 'category',
      label: 'Git',
      items: [
        {
          type: 'autogenerated',
          dirName: 'git'
        }
      ],
    },
    {
      type: 'category',
      label: 'Argentina',
      items: [
        {
          type: 'category',
          label: 'Río Negro',
          items: [
            {
              type: 'category',
              label: 'Viedma',
              items: [
                {type: 'autogenerated', dirName: 'argentina/historico/viedma'}
              ]
            },
            {
              type: 'category',
              label: 'Plan Castello',
              items: [
                {type: 'autogenerated', dirName: 'argentina/rio-negro'}
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Daily',
      items: [
        {
          type: 'autogenerated', dirName: 'daily'
        }
      ]
    },
  ]
};

module.exports = sidebars;
