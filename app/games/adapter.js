import ApplicationAdapter from 'ga-wdi-boston.ember-resources/application/adapter';

export default ApplicationAdapter.extend({
  createRecord(store, type, record){
    // let serialized = this.serialize(record, { includeId: true });
    // let parent_id = serialized.list_id;
    // let url = `/lists/${parent_id}/items`;
    // let data = { item: serialized };
    console.log("something new?");

    return true;
    // this.ajax(url, 'POST', { data });
  }
});
