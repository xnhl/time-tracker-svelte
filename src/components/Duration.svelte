<script>
	export let duration = ""
	export let ticks = 0
	export let groupTicks = 0
	export let progress = 0
	let title = `${duration.split("")[0].toUpperCase()}${duration.substring(1)}`
</script>

<style lang="sass">
.duration
	margin: 1rem 0.5rem
	padding: 0.5rem
	position: relative
	border-radius: 0.25rem
	box-shadow: 0 0 0.5rem 0.125rem rgba(0, 0, 0, 0.1)
	background: #eee
	.duration-title
		padding: 0.5rem
	.duration-ticks-wrapper
		position: relative
		height: 100%
		width: 100%
		height: 2rem
		border-radius: 0.25rem
		border: 0.05rem solid rgba(black, 0.5)
		.duration-fill
			height: 100%
			background: rgba(0, 0, 255, 0.33)
		.duration-ticks
			height: 100%
			width: 100%
			position: absolute
			top: 0
			left: 0
			z-index: 2
			display: grid
			background: transparent
			.duration-tick
				border-right: 0.025rem solid rgba(black, 0.75)
				&:last-child
					border-right: 0.025rem solid rgba(black, 0)
		.duration-ticks-grouped
			display: grid
			height: 100%
			width: 100%
			z-index: 2
			position: absolute
			top: 0
			left: 0
			background: transparent
			.duration-tick-grouped
				border-right: 0.05rem solid rgba(black, 1)
				&:last-child
					border-right: 0.05rem solid rgba(black, 0)
	.duration-labels-wrapper
		display: flex
		flex-wrap: wrap
		align-items: center
		justify-content: center
		.duration-label
			display: flex
			flex-wrap: wrap
			align-items: center
			justify-content: flex-end
			flex: 1
			padding: 0.25rem 0.1rem 0.25rem 0.25rem
			font-size: 0.75rem
	.duration-labels-wrapper[data-duration='year'], .duration-labels-wrapper[data-duration='month'], .duration-labels-wrapper[data-duration='week']
		.duration-label
			justify-content: flex-start
			padding: 0.25rem 0.25rem 0.25rem 0.1rem
	.duration-labels-wrapper[data-duration='month']
		.duration-label
			@media (max-width: 40rem)
				display: none
			&:nth-child(odd)
				@media (max-width: 40rem)
					display: flex
	.duration-labels-wrapper[data-duration='day']
		.duration-label
			@media (max-width: 30rem)
				display: none
			&:nth-child(3n)
				@media (max-width: 30rem)
					display: flex
	.duration-labels-wrapper[data-duration='hour'], .duration-labels-wrapper[data-duration='minute']
		.duration-label
			@media (max-width: 65rem)
				display: none
			&:nth-child(5n)
				@media (max-width: 65rem)
					display: flex
</style>

<div class="duration" id="{title}_component">
	<p class="duration-title">{title}</p>
	<div class="duration-ticks-wrapper">
		<div class="duration-fill" style="width: {progress}%;"></div>
		<div class="duration-ticks" style="grid-template-columns: repeat({ticks}, 1fr);">
			{#each Array(parseInt(ticks)) as tick}
				<div class="duration-tick"></div>
			{/each}
		</div>
		{#if groupTicks !== 0}
			<div class="duration-ticks-grouped" style="grid-template-columns: repeat({groupTicks}, 1fr);">
				{#each Array(parseInt(groupTicks)) as groupTick}
					<div class="duration-tick-grouped"></div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="duration-labels-wrapper" data-duration={duration}>
		{#each Array(parseInt(ticks)) as tick, index}
			<div class="duration-label">{parseInt(index) + 1}</div>
		{/each}
	</div>
</div>
