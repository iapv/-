<template>
    <div id="app">
         <mavon-editor v-model="value"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    }
}
</script>