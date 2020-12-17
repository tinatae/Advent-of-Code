require 'set'

input = File.readlines('16.txt').join("").split(/\n+/)

rules = input[0...input.index("your ticket:")]
Ticket = input[input.index("your ticket:")+1...input.index("nearby tickets:")]
nearby = input[input.index("nearby tickets:")+1..-1]

# PART ONE: # You can't read the words on your train ticket. You can, however, read the numbers, 
# and so you figure out the fields these tickets must have and the valid ranges for values in those fields.

# You collect: rules for ticket fields, the numbers on your ticket, numbers on other nearby tickets for the same train service

# Start by determining which tickets are invalid--tickets that contain values which aren't valid for any field. 
# Ignore your ticket for now.

# Adding together all of the invalid values produces your ticket scanning error rate: i.e. 4 + 55 + 12 = 71.
# Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?

def sumInvalidValues(rules, nearby)
  numset = Set.new
  ranges = rules.map {|str| str.scan(/\d+-\d+/)}.flatten

  ranges.each do |range|
    min, max = range.split("-").map(&:to_i)
    vals = (min..max).to_a
    vals.map {|val| numset.add(val)}
  end

  nearbys = nearby.map {|str| str.split(",")}.flatten.map {|num| num.to_i}

  notValid = nearbys.reject {|ele| numset.include?(ele)}

  rejectTix(notValid, nearbys)
end

# PART TWO. CHAINED ONTO PART ONE.

# Discard the invalid tickets. Use the remaining valid tickets to determine which field is which.
# Using the valid ranges for each field, determine what order the fields appear on the tickets. 
# The order is consistent between all tickets. 

# Look for the six fields on your ticket that start with the word departure. 
# What do you get if you multiply those six values together?

def rejectTix(notValid, nearbys)

  tickets = []
  i = 0

  while i < nearbys.length
    tix = nearbys[i..i+19]

    tickets << tix if tix.none? {|num| notValid.include?(num)}
    i += 20
  end

  sort_tix(tickets)
end

def sort_tix(tickets)
  master = {}
  collections = Hash.new {|h, k| h[k] = []}
  count = tickets[0].length

  i = 0

  while collections.keys.length < count
    collection = []
    tickets.each do |ticket|
      collection << ticket.shift
    end
    collections[i] = collection
    i+=1
  end
  
  collections.values.map {|collection| collection.uniq}
  check_validations(collections)
end

def check_validations(hash)

  fields = Hash.new {|h, k| h[k] = []}

  names = ["departure_location", "departure_station", "departure_platform", "departure_track", "departure_date", "departure_time", "arrival_location", "arrival_station", "arrival_platform", "arrival_track", "travel_class", "duration", "price", "route", "row", "seat", "train", "type", "wagon", "zone"]
  
  names.map {|name| fields[name] = []}

  hash.keys.each do |field_name|

      fields["departure_location"] << field_name if hash[field_name].all? {|val| departure_location(val) == true}

      fields["departure_station"] << field_name if hash[field_name].all? {|val| departure_station(val) == true}

      fields["departure_platform"] << field_name if hash[field_name].all? {|val| departure_platform(val) == true}

      fields["departure_track"] << field_name if hash[field_name].all? {|val| departure_track(val) == true}

      fields["departure_date"] << field_name if hash[field_name].all? {|val| departure_date(val) == true}

      fields["departure_time"] << field_name if hash[field_name].all? {|val| departure_time(val) == true}

      fields["arrival_location"] << field_name if hash[field_name].all? {|val| arrival_location(val) == true}

      fields["arrival_station"] << field_name if hash[field_name].all? {|val| arrival_station(val) == true}

      fields["arrival_platform"] << field_name if hash[field_name].all? {|val| arrival_platform(val) == true}

      fields["arrival_track"] << field_name if hash[field_name].all? {|val| arrival_track(val) == true}

      fields["travel_class"] << field_name if hash[field_name].all? {|val| travel_class(val) == true} 

      fields["duration"] << field_name if hash[field_name].all? {|val| duration(val) == true} 

      fields["price"] << field_name if hash[field_name].all? {|val| price(val) == true} 

      fields["route"] << field_name if hash[field_name].all? {|val| route(val) == true} 
      
      fields["row"] << field_name if hash[field_name].all? {|val| row(val) == true } 

      fields["seat"] << field_name if hash[field_name].all? {|val| seat(val) == true } 

      fields["train"] << field_name if hash[field_name].all? {|val| train(val) == true } 

      fields["type"] << field_name if hash[field_name].all? {|val| type(val) == true } 

      fields["wagon"] << field_name if hash[field_name].all? {|val| wagon(val) == true} 

      fields["zone"] << field_name if hash[field_name].all? {|val| zone(val) == true }
  end

  finalize_fields(fields)
end

# ------------------------ VALIDATION HELPERS BELOW ----------------------------

def departure_location(val)
  return true if val >= 49 && val <= 239 || val >= 247 && val <= 960
  false
end

def departure_station(val)
  return true if val >= 43 && val <= 135 || val >= 155 && val <= 963
  false
end

def departure_platform(val)
  return true if val >= 27 && val <= 426 || val >= 449 && val <= 955
  false
end

def departure_track(val)
  return true if val >= 43 && val <= 655 || val >= 680 && val <= 949
  false
end

def departure_date(val)
  return true if val >= 49 && val <= 159 || val >= 175 && val <= 970
  false
end

def departure_time(val)
  return true if val >= 44 && val <= 257 || val >= 280 && val <= 970
  false
end

def arrival_location(val)
  return true if val >= 26 && val <= 825 || val >= 848 && val <= 950
  false
end

def arrival_station(val)
  return true if val >= 25 && val <= 549 || val >= 557 && val <= 956
  false
end

def arrival_platform(val)
  return true if val >= 50 && val <= 460 || val >= 486 && val <= 964
  false
end

def arrival_track(val)
  return true if val >= 50 && val <= 368 || val >= 385 && val <= 950
  false
end

def travel_class(val)
  return true if val >= 45 && val <= 644 || val >= 653 && val <= 966
  false
end

def duration(val)
  return true if val >= 28 && val <= 210 || val >= 216 && val <= 972
  false
end

def price(val)
  return true if val >= 25 && val <= 193 || val >= 206 && val <= 969
  false
end

def route(val)
  return true if val >= 45 && val <= 727 || val >= 734 && val <= 949
  false
end

def row(val)
  return true if val >= 39 && val <= 520 || val >= 537 && val <= 970
  false
end

def seat(val)
  return true if val >= 42 && val <= 611 || val >= 627 && val <= 956
  false
end

def train(val)
  return true if val >= 34 && val <= 296 || val >= 307 && val <= 952
  false
end

def type(val)
  return true if val >= 25 && val <= 343 || val >= 349 && val <= 949
  false
end

def wagon(val)
  return true if val >= 41 && val <= 309 || val >= 326 && val <= 964
  false
end

def zone(val)
  return true if val >= 49 && val <= 118 || val >= 132 && val <= 952
  false
end
# ------------------------ VALIDATION HELPERS ABOVE ----------------------------

def finalize_fields(fields)
  answer_key = {}
  seen = Set.new
  sorted  = fields.sort_by {|k, v| v.length}

  sorted.length
    until answer_key.keys.length == sorted.length
      sorted.each do |category|

        field, nums = category
      
        idx = nums.select {|num| num if !seen.include?(num)}

        if idx.length == 1
          answer_key[field] = idx[0]
          seen.add(idx[0])
        end
      end
    end

  multiply_ticket(answer_key)
end

def multiply_ticket(answer_key) 

  answer = 1
  departure_fields = ["departure_station", "departure_time", "departure_location", "departure_date", "departure_platform", "departure_track"]
  
  departure_fields.each do |key_name|
    idx = answer_key[key_name]
    tix_arr = Ticket.join.split(",").map(&:to_i)

    answer *= tix_arr[idx]
  end
  answer
end

# p sumInvalidValues(rules, nearby)         # RETURNS 22977 FOR PART ONE
                                            # PART TWO CHAINED ON. RETURNS 998358379943