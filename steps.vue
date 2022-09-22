<template>
  <div class="custom-steps">
    <div :class="[currentStepIdx === i ? 'step-active':currentStepIdx >i?'step-finish':'step-default']"
      v-for="(item,i) in stepList" :key="'step'+i">
      <span class="step-item__serial">{{i+1}}</span>
      <span class="step-item__title">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentStepIdx: {
      type: Number,
      default: 4,
    },
    stepOption: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      stepList:this.stepOption
    }
  }

}
</script>

<style lang="scss" scoped>
@mixin custom-step-triangle($color, $offsetX, $offsetY, $direction) {
  position: absolute;
  top: 0;
  content: "";
  width: 0;
  height: 0;
  border-top: $offsetY solid transparent;
  border-bottom: $offsetY solid transparent;
  border-left: $offsetX solid $color;

  @if $direction==right {
    right: -$offsetX;
  }

  @else if $direction==left {
    left: 0;
  }
}

.custom-steps {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  .custom-step-item {
    flex: 1;
    background: #ffffff;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:not(:last-child) {
      margin-right: 15px;

      &::after {
        @include custom-step-triangle(#ffffff, 15px, 20px, right);
      }
    }

    &:not(:first-child) {
      &::before {
        @include custom-step-triangle(#f4f5fa, 15px, 20px, left);
      }
    }

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      &::after{
        display: none;
      }
    }

    .step-item__serial {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-family: DINAlternate, DINAlternate-Bold;
      font-weight: 500;
      text-align: center;
      line-height: 16px;
      margin-right: 10px;
      margin-top: 2px;
    }

    .step-item__title {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
    }
  }

  .step-active,
  .step-default,
  .step-finish {
    @extend .custom-step-item;
  }

  .step-active {
    background: #5e97f9;
    box-shadow: 0px 8px 8px 0px rgba(69, 90, 199, 0.07);

    &::after {
      @include custom-step-triangle(#5e97f9 !important, 15px, 20px, right);
    }

    .step-item__serial {
      color: #5e97f9;
      background: #ffffff;
    }

    .step-item__title {
      color: #ffffff;
    }
  }

  .step-default {
    .step-item__serial {
      color: #ffffff;
      background: rgba(0, 0, 0, 0.25);
    }

    .step-item__title {
      color: #929292;
    }
  }

  .step-finish {
    .step-item__serial {
      color: #ffffff;
      background: #5e97f9;
    }

    .step-item__title {
      color: #4f8ae1;
    }
  }
}
</style>
