input = File.readlines('5.txt').join.split(/\n+/)

# First 7 characters will either be F or B specifying exactly one of 128 rows on the plane (numbered 0 through 127).
# Each letter tells which half of region the given seat is in. 
# First letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). 
# The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

# Last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane
#  (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. 
# L means to keep the lower half, while R means to keep the upper half.

# PART ONE: What is the highest seat ID on a boarding pass?

def highest_seat(data)
    data.map {|b_pass| b_pass.match(/(.{7})(.{3})/).captures}
    .map {|row, col| [row.gsub("F", "0").gsub("B", "1").to_i(2), col.gsub("L", "0").gsub("R", "1").to_i(2)]}  # CONVERT BASE-10 BACK TO BASE-2
    .map{|row, col| (row*8 + col)}                  # SEAT ID IS row * 8 + col
    .max
end

# PART TWO: Which row is missing?

def missing_seat(data)
    seats = data.map {|b_pass| b_pass.match(/(.{7})(.{3})/).captures}
    .map {|row, col| [row.gsub("F", "0").gsub("B", "1").to_i(2), col.gsub("L", "0").gsub("R", "1").to_i(2)]}
    .map {|row, col| (row*8 + col)}

    min, max = seats.minmax                                               # GET LOWEST, HIGHEST VAL. RETURNS [38, 998]

    (min..max).each {|num| return num if !seats.include?(num)}           
end


# p highest_seat(input)     # RETURNS 998
# p missing_seat(input)     # RETURNS 676