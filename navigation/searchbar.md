---
layout: base
title: Searchbar
permalink: /navigation/searchbar
---

<link rel="stylesheet" href="{{site.baseurl}}/assets/css/styles.css">

<style>
#gameContainer {
    position: relative;
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
}

canvas {
    position: absolute;
    image-rendering: pixelated;
    background-color: transparent;
    margin: 0;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#errorMessage {
    color: blue;
    padding: 20px;
    font-family: monospace;
    white-space: pre-wrap;
    z-index: 1000;
    position: relative;
}

#stats-container {
    position: fixed;
    top: 75px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
}
</style>

<div id="gameContainer">
    <canvas id="gameCanvas"></canvas>
    <div id="errorMessage"></div>
</div>

<script >

</script>