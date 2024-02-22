<script>
	import TwoTruths from 'two-truths'
	const promise = async () => await fetch('/api/getTruths').then(res => res.json()) 
</script>


<TwoTruths getTruths={promise}/>