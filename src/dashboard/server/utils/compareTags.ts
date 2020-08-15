import _ from 'lodash'

export async function compareTags(tag1, tag2, ignoreFields) {
  //copy tags
  const t1 = _.cloneDeep(tag1)
  const t2 = _.cloneDeep(tag2)

  //delete ignore fields
  for (const field of ignoreFields) {
    delete t1[field]
    delete t2[field]
  }

  return _.isEqual(t1, t2)
}
