<template>
  <div class="square">
    <ul>
      <li :style="{'border': '1px solid ' + color,'color': fontColor}">氺氺</li>
      <li :style="{'border': '1px solid ' + color,'color': fontColor}">BUAA</li>
      <li :style="{'border': '1px solid ' + color,'color': fontColor}">2021</li>
      <li :style="{'border': '1px solid ' + color,'color': fontColor}">Lab</li>
      <li :style="{'border': '1px solid ' + color,'color': fontColor}">@</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Lis",
  props: {
    color: {
      color: String,
      default: "#6799f1"
    },
    fontColor: {
      fontColor: String,
      default: "#c9d6df"
    }
  }
}
</script>

<style scoped>
ul li {
  position: absolute;
  border: 1px solid #6799f1;
  width: 30px;
  height: 30px;
  list-style: none;
  opacity: 0;
  border-radius: 20%;
  color: #c9d6df;
  text-align: center;
}

.square li {
  top: 60vh;
  left: 45vw;
  animation: square 8s linear infinite;
}

.square li:nth-child(2) {
  top: 80vh;
  left: 10vw;
  animation-delay: 2s;
}

.square li:nth-child(3) {
  top: 80vh;
  left: 85vw;
  animation-delay: 4s;
}

.square li:nth-child(4) {
  top: 10vh;
  left: 70vw;
  animation-delay: 6s;
}

.square li:nth-child(5) {
  top: 20vh;
  left: 10vw;
  animation-delay: 8s;
}

@keyframes square {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: scale(5) rotate(360deg);
    opacity: 0;
  }
}
</style>
