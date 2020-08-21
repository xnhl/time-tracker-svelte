<script>
	import moment from "moment"
	import { onMount } from "svelte"
	import Duration from "./components/Duration.svelte"
	let time = `${moment().format("LL")} ${moment().format("LTS")}`
	let secondsElapsed = 0
	let sleepTime = ""
	let minute = moment().seconds() * 1.666666666666667
	let monthLen = moment().daysInMonth()
	let hour = 0.0
	let day = 0.0
	let week = 0.0
	let month = 0.0
	let year = 0.0
	
	let now = moment()
	let dayStart = moment().startOf('day')
	let numSeconds = now.diff(dayStart, 'seconds')
	secondsElapsed = numSeconds

	let dayStartUnix = moment().startOf("day").unix()
	let dayEndUnix = moment().endOf("day").unix()
	let dayNowUnix = moment().unix()
	let dayLength = dayEndUnix - dayStartUnix
	let dayPct = ((dayNowUnix - dayStartUnix)/dayLength) * 100
	day = dayPct

	let hourStartUnix = moment().startOf("hour").unix()
	let hourEndUnix = moment().endOf("hour").unix()
	let hourNowUnix = moment().unix()
	let hourLength = hourEndUnix - hourStartUnix
	let hourPct = ((hourNowUnix - hourStartUnix)/hourLength) * 100
	hour = hourPct
	
	let weekStartUnix = moment().startOf("week").unix()
	let weekEndUnix = moment().endOf("week").unix()
	let weekNowUnix = moment().unix()
	let weekLength = weekEndUnix - weekStartUnix
	let weekPct = ((weekNowUnix - weekStartUnix)/weekLength) * 100
	week = weekPct
	
	let monthStartUnix = moment().startOf("month").unix()
	let monthEndUnix = moment().endOf("month").unix()
	let monthNowUnix = moment().unix()
	let monthLength = monthEndUnix - monthStartUnix
	let monthPct = ((monthNowUnix - monthStartUnix)/monthLength) * 100
	month = monthPct
	
	let yearStartUnix = moment().startOf("year").unix()
	let yearEndUnix = moment().endOf("year").unix()
	let yearNowUnix = moment().unix()
	let yearLength = yearEndUnix - yearStartUnix
	let yearPct = ((yearNowUnix - yearStartUnix)/yearLength) * 100
	year = yearPct

	onMount(async () => {
		setInterval(() => {
			let dayStartUnix = moment().startOf("day").unix()
			let dayEndUnix = moment().endOf("day").unix()
			let dayNowUnix = moment().unix()
			let dayLength = dayEndUnix - dayStartUnix
			let dayPct = ((dayNowUnix - dayStartUnix)/dayLength) * 100
			day = dayPct

			let hourStartUnix = moment().startOf("hour").unix()
			let hourEndUnix = moment().endOf("hour").unix()
			let hourNowUnix = moment().unix()
			let hourLength = hourEndUnix - hourStartUnix
			let hourPct = ((hourNowUnix - hourStartUnix)/hourLength) * 100
			hour = hourPct
			 
			let weekStartUnix = moment().startOf("week").unix()
			let weekEndUnix = moment().endOf("week").unix()
			let weekNowUnix = moment().unix()
			let weekLength = weekEndUnix - weekStartUnix
			let weekPct = ((weekNowUnix - weekStartUnix)/weekLength) * 100
			week = weekPct
			
			let monthStartUnix = moment().startOf("month").unix()
			let monthEndUnix = moment().endOf("month").unix()
			let monthNowUnix = moment().unix()
			let monthLength = monthEndUnix - monthStartUnix
			let monthPct = ((monthNowUnix - monthStartUnix)/monthLength) * 100
			month = monthPct
			
			let yearStartUnix = moment().startOf("year").unix()
			let yearEndUnix = moment().endOf("year").unix()
			let yearNowUnix = moment().unix()
			let yearLength = yearEndUnix - yearStartUnix
			let yearPct = ((yearNowUnix - yearStartUnix)/yearLength) * 100
			year = yearPct

			time = `${moment().format("LL")} ${moment().format("LTS")}`
			minute = parseInt(moment().seconds()) * 1.666666666666667
			secondsElapsed++
		}, 1000)
	})
</script>

<style lang="sass">
#home-wrapper
	animation: fadeIn 0.25s ease-in-out
	padding: 0.25rem
	position: relative
	#time
		padding: 1rem
		margin: 1rem
		font-size: 1.25rem
		display: flex
		align-items: center
		justify-content: center
	#durations-wrapper
		width: 100%
		margin: 0 auto
		padding: 0.25rem
		border-radius: 0.25rem
		background: #eee
		box-shadow: 0 0 0.5rem 0.125rem rgba(0, 0, 0, 0.025), 0 0 0.5rem 0.25rem rgba(255, 255, 255, 0.1) inset
</style>

<svelte:head>
	<title>Time</title>
	<meta name="description" content="A unique way to observe the time passing.">
</svelte:head>

<div id="home-wrapper">
	<div id="time">{time}</div>
	<div id="durations-wrapper">
		<Duration progress={minute} duration="minute" ticks={60} groupTicks={4} />
		<Duration progress={hour} duration="hour" ticks={60} groupTicks={4} />
		<Duration progress={day} duration="day" ticks={24} groupTicks={4} />
		<Duration progress={week} duration="week" ticks={7} groupTicks={0} />
		<Duration progress={month} duration="month" ticks={monthLen} groupTicks={0} />
		<Duration progress={year} duration="year" ticks={12} groupTicks={4} />
	</div>
</div>
