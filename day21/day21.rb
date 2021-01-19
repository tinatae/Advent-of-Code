# you can't read any ingredients lists. However, sometimes, allergens are listed in a language you do understand. 
# You should be able to use this information to determine which ingredient contains which allergen and work out 
# which foods are safe to take with you on your trip.

# You start by compiling a list of foods (your puzzle input), one food per line. 
# Each line includes that food's ingredients list followed by some or all of the allergens the food contains.

# Each allergen is found in exactly one ingredient. Each ingredient contains zero or one allergen. 
# Allergens aren't always marked; when they're listed (as in (contains nuts, shellfish) after an ingredients list), 
# the ingredient that contains each listed allergen will be somewhere in the corresponding ingredients list. 
# However, even if an allergen isn't listed, the ingredient that contains that allergen could still be present: 
# maybe they forgot to label it, or maybe it was labeled in a language you don't know.

# PART ONE: Determine which ingredients cannot possibly contain any of the allergens in your list. 
# How many times do any of those ingredients appear?

# PART TWO: Arrange the ingredients alphabetically by allergen and separate them by commas to produce your 
# canonical dangerous ingredient list. (There should not be any spaces in your canonical dangerous ingredient list.) 

require 'set'
input = File.readlines('21.txt').join.split(/\n/)

# test = File.readlines('example.txt').join.split(/\n/)

# p test.map {|str| str[0...str.index("(contains")]}.join.split(" ")    # LEAVE SINGLE SPACE BEFORE JOINING


def find_allergens(input)
  hash = Hash.new {|h, k| h[k] = []}

  input.map do |list|
    ingredients, allergens = list.split("(contains ")
    hash[allergens[0...-1]].push(ingredients)
  end

  all_ingredients = Array.new(hash.values).join.split(" ")

  hash.keys.select {|key| key.include?(",")}.each do |set|
    set.split(", ").map {|ingredient| hash[ingredient] += hash[set]}
    hash.delete(set)
  end

  coded_ingredients = Hash.new {|h, k| h[k] = []}

  hash.keys.each do |allergen|
    sorted = hash[allergen].sort_by {|food| food.split(" ").length}

    sorted[0].split(" ").each do |ingredient|
      coded_ingredients[allergen].push(ingredient) if sorted[1..-1].all? {|str| str.include?(ingredient)}
    end
  end
  
  claimed = Set.new
  allergens = {}

  until allergens.keys.length == hash.keys.length
    coded_ingredients.keys.each do |ingredient|
      if coded_ingredients[ingredient].length == 1
        item = coded_ingredients[ingredient].join("")

        allergens[ingredient] = item
        coded_ingredients.keys.delete(ingredient)
        claimed.add(item)

      elsif coded_ingredients[ingredient].any? {|code| claimed.include?(code)}
        new_arr = coded_ingredients[ingredient].reject {|ele| claimed.include?(ele)}

        coded_ingredients[ingredient] = new_arr
        next
      else
        next
      end 
    end
  end

  p all_ingredients.count {|val| !allergens.values.include?(val)}         # PART ONE: 2659

  p allergens.sort_by {|k, v| k}.map {|ele| ele[1]}.join(?,)              # PART TWO: rcqb,cltx,nrl,qjvvcvz,tsqpn,xhnk,tfqsb,zqzmzl

end


p find_allergens(input)
