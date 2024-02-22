<script>
	import TwoTruths from 'two-truths'
	const promise = async () => await fetch('/api/getTruths', {
            cache: 'no-store',
        }).then(res => res.json()) 
</script>


<TwoTruths getTruths={promise}/>