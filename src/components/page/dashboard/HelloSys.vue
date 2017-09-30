<template>
    <div class="app-container">
        <div class="wrapper">
            <ul>
                <h1 class="text-jumbo text-ginormous"><li><a target='_blank' :href="bluChatHost">Bluchat 官网</a></li></h1>
            </ul>
            <img class='heroImage' :src="heroImage">
        </div>
    </div>
</template>

<script>
    import  heroImage from '../../../../static/img/hero_image.png'

    export default {
        name: 'helloSys-default',
        data() {
            return {
                heroImage: heroImage,
                bluChatHost: "https://www.bluchat.com"
            };
        }
    };
</script>

<style>
    .wrapper {
        width: 800px;
        margin: 40px auto;
    }
    .text-jumbo {
        font-size: 20px;
        font-weight: 700;
        color: #484848;
    }
    .heroImage {
        display: block;
        width: 45%;
        margin: 0 auto;
    }
</style>
