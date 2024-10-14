async function getItunesSongs(songListLength = 12) {
    try {
      setLoading(true);
      if (searchText === "") {
        throw new Error("No Search Input");
      }
  
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchText)}&limit=${songListLength}&media=music`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("No Results from Search Input");
      }
  
      onSearch(data.results);
      setSearchText("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }
  