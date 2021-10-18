<script>
    let quotes = [];
    let totalPages = -1;
    let page = 1;
    $: fetchQuotes(page);

    function prevPage() {
        if (page > 1) {
            page -= 1;
        }
    }
    function nextPage() {
        if (totalPages < 1) {
            page = 1;
        } else {
            if (page < totalPages) {
                page += 1;
            }
        }
    }

    function fetchQuotes(page) {
        fetch("http://localhost:3000/quotes?page=" + page)
            .then((response) => response.json())
            .then((r) => {
                quotes = r.data;
            });
    }
    fetch("http://localhost:3000/pages")
        .then((response) => response.json())
        .then((r) => {
            totalPages = r;
        });
</script>

<p>
    <button on:click={prevPage}>&nbsp;&nbsp;&lt;&nbsp;&nbsp;</button>
    &nbsp; Page {page} of {totalPages} &nbsp;
    <button on:click={nextPage}>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</button>
</p>
<ul>
    {#each quotes as q}
        <li>{q.quote} &mdash;{q.author}</li>
    {/each}
</ul>
