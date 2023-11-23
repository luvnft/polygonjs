<template>
	<Scene01 />
	<a class="page-title" href="https://polygonjs.com">
		<img class="page-title-logo" :src="polygonjsLogo" />
		<span class="page-title-text">Polygon + Vue</span>
	</a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene01 from "./polygonjs/scenes/Scene01.vue";
import polygonjsLogo from "./assets/polygonjs.png";

export default defineComponent({
	name: "App",
	components: {
		Scene01,
	},
	setup() {
		return {
			polygonjsLogo,
		};
	},
});
</script>
