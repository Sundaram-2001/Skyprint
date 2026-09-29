<main>
	<p class="mark">Skyprint</p>
	<h1>Welcome to Skyprint</h1>
	<p class="lede">Get your daily horrorscope delivered to you</p>
	<div class="actions">
		<button type="button">
			<svg viewBox="0 0 18 18" aria-hidden="true">
				<path
					fill="#4285F4"
					d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
				/>
				<path
					fill="#34A853"
					d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
				/>
				<path
					fill="#FBBC05"
					d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
				/>
				<path
					fill="#EA4335"
					d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
				/>
			</svg>
			Continue with Google
		</button>
		<a href="#homescreen">Add this to your homescreen</a>
	</div>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		padding: 3rem 1.5rem;
		text-align: center;
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

	.mark {
		margin: 0 0 0.35rem;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: #e7c98a;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.4rem, 6vw, 4.25rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}

	.lede {
		margin: 0.15rem 0 1.25rem;
		max-width: 22rem;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 1.05rem;
		line-height: 1.5;
		color: #c9c3b6;
	}

	.actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	button {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.85rem 1.35rem;
		border: 0;
		border-radius: 999px;
		background: #f7f4ee;
		color: #161616;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
	}

	button:hover {
		background: #fff;
	}

	button svg {
		width: 1.05rem;
		height: 1.05rem;
	}

	a {
		color: #d8d0c2;
		font-family: ui-sans-serif, system-ui, sans-serif;
		font-size: 0.9rem;
		text-underline-offset: 0.28em;
	}

	a:hover {
		color: #fff;
	}
</style>
