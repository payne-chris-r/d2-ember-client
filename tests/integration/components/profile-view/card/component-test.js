import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('profile-view/card', 'Integration | Component | profile view/card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{profile-view/card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#profile-view/card}}
      template block text
    {{/profile-view/card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
