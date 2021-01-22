require 'set'

input = File.readlines('6.txt').join.split(/\n\n/)

# PART ONE: RETURN TOTAL SUM OF UNIQUE QUESTIONS PER GROUP (REPRESENTED AS COUNT OF "abcd...z")

def part_one(data)
    data.map {|string| string.split(/\n/).join("").chars.to_set.size}.sum
end

# PART TWO: RETURN # OF COMMON QUESTIONS PER GROUP (REPRESENTED AS COUNT OF "abcd...z")

def part_two(data)

    arrayed = data.map {|string| string.split(/\n/)}                # REMOVES LINES WITHIN GROUP

    min_vals = arrayed.map {|arr| arr.min_by {|ele| ele.size }}     # RETURNS SHORTEST STRING WITHIN GROUP

    counted = []

    arrayed.each_with_index do |arr, i|                             # PER GROUP..
        count = 0
        min_vals[i].chars.each do |char|                            # CREATE ARRAY OF SHORTEST STRING CHARS
            count += 1 if arr.all? {|ele| ele.include?(char)}       # AND INCREASE COUNT IF ALL ELEMENTS HAVE THAT CHARACTER
        end
        counted.push(count)                                         # ADD COUNT TO ARRAY
    end

    counted.sum                                                     # SUM THEM
end

# p part_one(input)                                                 # RETURNS 6885
# p part_two(input)                                                 # RETURNS 3550
