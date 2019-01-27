require "i18n"

I18n::Backend::Simple.include(I18n::Backend::Gettext)
I18n.load_path << Dir["po/*.po"]  # Load all PO file in current directory

activate :i18n,
	 :langs => [:en, :es, :fr],
	 :path => "/:locale/",
	 :no_fallbacks => true,
	 :data => "po"

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

helpers do
  include I18n::Gettext::Helpers
end

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
