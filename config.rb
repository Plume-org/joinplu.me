require "gettext"
require "middleman-core/sitemap/extensions/proxies"

GetText::bindtextdomain 'joinplume', { path: 'translations' }

ready do
  File.readlines('po/LINGUAS').each do |lang|
    lang = lang.strip
    GetText::set_locale lang
    puts(GetText::_("A federated blogging application"))
    sitemap.resources.select{ |r| !r.respond_to?(:target_resource) && r.ext == ".html" }.each do |res|
      proxy "#{lang}/#{res.destination_path}", res.path, {}
    end
  end
end

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

helpers do
  include GetText
end

# configure :build do
#   activate :minify_css
#   activate :minify_javascript
# end
