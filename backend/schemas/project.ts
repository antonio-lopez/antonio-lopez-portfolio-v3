import {defineField, defineType, defineArrayMember} from '@sanity-typed/types'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of project',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'List of images for project including cover, examples, and highlights',
      of: [
        defineArrayMember({
          title: 'Object',
          type: 'object',
          fields: [
            {type: 'url', name: 'url'},
            {type: 'string', name: 'alt'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short description of project',
      rows: 4,
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'liveLink',
      title: 'Live Link',
      type: 'url',
      description: 'Link for live demo of project',
    }),
    defineField({
      name: 'githubLink',
      title: 'Github Repository',
      type: 'url',
      description: 'Link for Github repository',
    }),
    defineField({
      name: 'figmaLink',
      title: 'Figma Prototype',
      type: 'url',
      description: 'Link for Figma prototype',
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      description: 'Date of project',
      options: {
        dateFormat: 'YYYY-MMMM',
      },
    }),
    defineField({
      name: 'rank',
      title: 'Project Ranking',
      type: 'number',
      description: 'Rank of project that will be used for home page project highlights',
      options: {
        list: [1, 2, 3],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Tags associated with the project',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tags'}]})],
    }),
  ],
})
