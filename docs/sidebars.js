module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Coastal Image Labeler',
      items: [
        'overview/overview',
        'overview/goals',
        'overview/roadmap'
      ],
    },
    {
      type: 'category',
      label: 'Code Documentation',
      items: [
        'codeDocs/overview'
      ],
    },
    {
      type: 'category',
      label: 'User Documentation',
      items: [
        'userDocs/overview',
        {
          type: 'category',
          label: 'Question Sets',
          items: [
            'userDocs/questionSets/overview',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Other',
      items: [
        'other/styling'
      ],
    },
  ]
};
