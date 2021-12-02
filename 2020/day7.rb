require 'set'

input = File.readlines('7.txt').join.split(/\n/)

# PART ONE: FIGURE OUT HOW MANY COLORS COULD HOLD A 'shiny gold' BAG
# PART TWO: HOW MANY BAGS COULD ONE 'shiny gold' BAG HOLD

def make_array(data)
    removed_lines = data.map {|ele| ele.split("contain").join(":")}

    empties = []
    nesters = []

    removed_lines.each do |string|
        if string.include?("no other bags")
            empties.push(string.match(/^\w+ \w+/)[0].to_s)
        else
            nesters.push(string.split("contain").join(""))
        end
    end

    ordered = []
    nesters.each do |substr|
        colors = [substr.match(/\w+ \w+/)[0].to_s]
        substr[substr.index(":")+1..-1].split(",").each {|entry| colors.push(entry.match(/[a-z]+ [a-z]+/)[0].to_s)}
        ordered.push(colors)
    end

    sort_through(ordered, empties)
end

def sort_through(ordered, empties)
    dead_end = Set.new(empties)

    seen = []
    look_for = ["shiny gold"]
    

    until look_for.empty?
        query = look_for.shift

        if !dead_end.include?(query) && !seen.include?(query)
            included = ordered.select {|subarr| subarr[1..-1].include?(query)}.map {|ele| ele[0]}
            seen.push(query)
            look_for += included
        end
    end

    seen.length - 1                                    # RETURNS 128 (-1 BC NEED TO SUBTRACT 'shiny gold')
end

def part_two(data)
    removed_lines = data.map {|ele| ele.split("contain").join(":")}

    empties = []
    nesters = []

    removed_lines.each do |string|
        if string.include?("no other bags")
            empties.push(string.match(/^\w+ \w+/)[0].to_s)         
        else
            nesters.push(string.split("contain").join(""))
        end
    end

    ordered = []
    nesters.each do |substr|
        colors = [substr.match(/\w+ \w+/)[0].to_s]              # SLIGHTLY DIFFERENT SET UP. KEEP NUMBERS THIS TIME
        
        substr[substr.index(":")+1..-1].split(",").each {|entry| colors.push(entry.match(/[\d]+ [a-z]+ [a-z]+/)[0])}
        
        ordered.push(colors)
    end

    fit_in_bag(empties, ordered)

end

def fit_in_bag(empties, ordered)
    dead_end = Set.new(empties)

    seen = []
    look_for = ["shiny gold"]

    until look_for.empty?

        query = look_for.shift

        if !dead_end.include?(query)
            next_colors = []

            ordered.each {|subarr| next_colors += subarr[1..-1] if subarr[0] == query}
            
            color_names = []

            next_colors.each do |ele|
                count = 0
                count += ele[0].to_i
                count.times { color_names.push(ele[2..-1])}         # PUSH COLOR NAMES ONLY
            end

            seen.push(query)
            look_for += color_names

        else # dead_end includes query
            seen.push(query)
        end
    end
    seen.length - 1                                                 # RETURNS 20189
end

# p make_array(input)
# p part_two(input)
