<template>
  <div style="width:250px;border:1px solid red">
    <spang-tabs :currentTab="'first'">
      <spang-tab-pane :label="'tab1'" :name="'first'">
        uuuuu1
      </spang-tab-pane>
      <spang-tab-pane :label="'tab2我超级长'" :name="'second'">
        uuuuu2
        <h1>hhhhh</h1>
        <h1>hfsndflslk</h1>
      </spang-tab-pane>
      <spang-tab-pane :label="'tab3'" :name="'third'">
        uuuuu23
      </spang-tab-pane>
      <spang-tab-pane :label="'tab4'" :name="'fourth'">
        uuuuu4
      </spang-tab-pane>
    </spang-tabs>
  </div>

</template>

<script>
import SpangTabs from './spang-tabs';
import SpangTabPane from './spang-tab-pane';
export default {
  components: { SpangTabs, SpangTabPane },
}
</script>

<style>

</style>