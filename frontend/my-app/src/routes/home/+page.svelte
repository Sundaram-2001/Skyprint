<main>
	<form>
		<p class="mark">Skyprint</p>
		<h1>Hi. The sky has notes on you.</h1>
		<p class="lede">Three facts, then we stop guessing and actually look up. No birth certificate lecture. Promise.</p>

		<label for="dob">The day you crash-landed on Earth</label>
		<input id="dob" type="date" name="dob" />

		<label for="place">The patch of dirt you arrived on</label>
		<input
			id="place"
			type="text"
			name="place"
			placeholder="Mumbai, Maharashtra, India"
			autocomplete="off"
		/>

		<label for="time">The hour the universe shrugged and said fine</label>
		<input id="time" type="time" name="time" />

		<button type="submit">Save my details</button>
	</form>
</main>

<style>
	:global(body) {
		margin: 0;
		background: #070b16;
	}

	main {
		box-sizing: border-box;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5rem 1.25rem;
		color: #f6f1e8;
		font-family: Georgia, 'Iowan Old Style', Palatino, serif;
		background:
			radial-gradient(1px 1px at 12% 22%, rgba(255, 255, 255, 0.85) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 78% 16%, rgba(255, 244, 214, 0.9) 50%, transparent 52%),
			radial-gradient(1px 1px at 64% 68%, rgba(255, 255, 255, 0.55) 50%, transparent 52%),
			radial-gradient(1px 1px at 28% 78%, rgba(255, 255, 255, 0.45) 50%, transparent 52%),
			radial-gradient(1.5px 1.5px at 88% 74%, rgba(255, 255, 255, 0.4) 50%, transparent 52%),
			radial-gradient(ellipse 80% 50% at 50% -10%, #24325c 0%, transparent 70%),
			radial-gradient(ellipse 40% 30% at 80% 100%, #1a1630 0%, transparent 70%),
			#070b16;
	}

	form {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: min(100%, 26rem);
		padding: 2rem 1.5rem 1.6rem;
		border: 1px solid rgba(231, 201, 138, 0.18);
		border-radius: 1.4rem;
		background: rgba(10, 14, 28, 0.72);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
	}

	.mark {
		margin: 0 0 0.7rem;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: #e7c98a;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 4vw, 2.4rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.15;
	}

	.lede {
		margin: 0.7rem 0 1.4rem;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.95rem;
		line-height: 1.5;
		color: #c9c3b6;
	}

	label {
		margin-bottom: 0.4rem;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.92rem;
		color: #f6f1e8;
	}

	input {
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 1.1rem;
		padding: 0.75rem 0.85rem;
		border: 1px solid rgba(246, 241, 232, 0.16);
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		color: #f6f1e8;
		color-scheme: dark;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.95rem;
	}

	input:focus {
		outline: 2px solid rgba(231, 201, 138, 0.7);
		outline-offset: 1px;
	}

	button {
		margin-top: 0.3rem;
		padding: 0.85rem 1.2rem;
		border: 0;
		border-radius: 999px;
		background: #f7f4ee;
		color: #161616;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background: #fff;
	}
</style>
