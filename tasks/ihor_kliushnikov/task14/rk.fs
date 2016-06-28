let hash str =
    let l = String.length str - 1
    str 
        |> Seq.mapi (fun i elem -> (int elem) * pown 101 (l-i))
        |> Seq.sum
    
let rehash oldHash oldChar newChar l = 
    (oldHash - (int oldChar) * (pown 101 (l-1))) * 101 + (int newChar)
    
let rec searchPattern patternHash subHash text pattern i = 
    let m = String.length pattern
    let n = String.length text
    match i with
    | i when (subHash = patternHash && text.Substring(i, m) = pattern) 
        -> i // found
    | i when i < (n - m) 
        -> 
            let reHash = (rehash subHash text.[i] text.[i + m] m)
            searchPattern patternHash reHash text pattern (i + 1)
    | _ -> -1 // Not found
    
let rabinKarp (text:string) pattern =
    let substringHash = hash (text.Substring(0, String.length pattern))
    searchPattern (hash pattern) substringHash text pattern 0
    
["New"; "uri"; "r p"; "Mars"; "qq"]
    |> List.map (rabinKarp "New findings from NASA’s Curiosity Rover provide evidence that significant amounts of oxygen once permeated the atmosphere of ancient Mars")
// output: [0; 26; 39; 134; -1]