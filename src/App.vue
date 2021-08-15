<template>
    <div id="app">
        <transition name="fade">
            <b-container class="py-3">
                <div class="pb-4">
                    <h3 class="text-center font-weight-bold">WebEngage Test Task</h3>
                    <hr class="col-12 mx-auto">
                </div>
                <router-view></router-view>
            </b-container>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
</style>
