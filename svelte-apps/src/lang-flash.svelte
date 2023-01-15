<script>
	import LanguageFlash from 'language-flash'
	const promise = fetch('/api/getMandarin').then(res => res.json()) 
</script>


{#await promise}
	<LanguageFlash />
{:then vocabData}
	<LanguageFlash vocabData={vocabData} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}